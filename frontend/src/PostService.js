const url = "http://localhost:5000/api/posts";

class PostService {
    static async getPostById(postID) {
        try {
            const res = await fetch(url + '/postDetails/' + postID);

            const data = res?.json();

            return data;
        } catch (err) {
            console.error(err.message);
        }
    }

    // GET Posts
    static async getPosts() {
        try {
            const res = await fetch(url);

            const data = await res.json();

            return (
                data.map(post => ({
                    ...post,
                }))
            );
        } catch(err) {
            console.error(err.message);
        }
    }

    // GET Image
    static getImage(filename) {
        return url + '/uploads/' + filename;
    }

    // POST Posts
    static insertPost(formDataOBJ) {         
        const headers = new Headers();

        headers.append('Accept', 'application/json');

        const request = new Request(url, {
            method: 'POST',
            headers,
            mode: 'no-cors',
            body: formDataOBJ
        });

        fetch(request);
    }
}

export default PostService;