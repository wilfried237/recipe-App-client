import useLoader from "./use-loadrecipe";

const useEdamanApi =  (search) => {
    const {data,isLoading,error} = useLoader(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=5e65853d&app_key=745b5b448240096e69bd7c64fab12072&from=0&to=100`);
    return {data, isLoading, error};
}

export {useEdamanApi};