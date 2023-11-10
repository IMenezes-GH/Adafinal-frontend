

const fetchData = async(url: string, options: RequestInit) => {

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('err');
        
        const message = await response.json();
        console.log(message);
        return {response, message};
    }
    catch (err){
        if (err instanceof Error){
            console.log(err.message);
        }
    }
}

export default fetchData