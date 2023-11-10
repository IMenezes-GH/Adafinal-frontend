

const fetchData = async(url: string, options: RequestInit) => {

    try {
        const response = await fetch(url, options);
        const message = await response.json();
        return {response, message};
    }
    catch (err){
        if (err instanceof Error){
            console.log(err.message);
        }
    }
}

export default fetchData