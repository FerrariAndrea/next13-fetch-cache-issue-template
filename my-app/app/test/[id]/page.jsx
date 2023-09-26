import {TEST_PAGE_COUNT,
  BACKEND_URL,
  BASE_SIZE,
  REVALIDATE
} from '../../config'

async function getData(id) {
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    const opt = {
        method: 'POST',
        headers,
        body: JSON.stringify({id,size:BASE_SIZE*Number(id)}),
    }
    if(REVALIDATE){
      opt.next={ revalidate: 3600 }
    }else{
      opt.cache = 'no-store'
    }
    const res = await fetch(BACKEND_URL, opt)
    if (!res.ok) {
        throw new Error('Failed to fetch data for ID: '+ id)
    }
    return res.json()
}

export async function generateStaticParams() {
  const paths = []
  for(let x =0;x<TEST_PAGE_COUNT;x++){
    paths.push({ id: x.toString() });
  }
  return paths
}

export default async function Test({ params }) {
  const { id } = params
  const data = await getData(id)

  return (
    <main>
      <h2>{"TEST page:"+id}</h2>
      <div>
      {JSON.stringify(data)}
      </div>
    </main>
  )
}
