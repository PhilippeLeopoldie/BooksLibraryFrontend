const  FetchApi=async(path:string)=> {
    const result = await fetch(path)
    return await result.json()
  }

export default FetchApi

