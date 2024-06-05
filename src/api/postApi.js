import axios from 'axios'

const URL = 'https://jsonplaceholder.typicode.com/posts'

export const retrievePosts = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;

    } catch (error) {
        console.log('Error retrieving posts', error)
    }
}

export const retrievePostsByID = async (id) => {
    try {
        const response = await axios.get(URL + `/${id}`);
        return response.data;

    } catch (error) {
        console.log('Error retrieving posts', error)
    }
}