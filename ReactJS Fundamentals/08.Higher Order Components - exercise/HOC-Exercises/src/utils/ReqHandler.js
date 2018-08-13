const AppKey = 'kid_ByKWXxToG';
const AppSecrets = 'b6f669b7b0284f31877b5815895e5588';
const HostUrl = 'https://baas.kinvey.com';

let ReqHandler = {
    login: (user) => {
        return fetch(`${HostUrl}/user/${AppKey}/login`, {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + btoa(`${AppKey}:${AppSecrets}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            return res.json();
        });
    },

    register: (user) => {
        return fetch(`${HostUrl}/user/${AppKey}`, {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + btoa(`${AppKey}:${AppSecrets}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            return res.json();
        });
    },

    logout: () => {
        return fetch(`${HostUrl}/user/${AppKey}/_logout`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        });
    },

    allPosts: () => {
        return fetch(`${HostUrl}/appdata/${AppKey}/posts?query={}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.json();
        });
    },

    myPosts: (user) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/posts?query={"author":"${user}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.json();
        });
    },

    createPost: (newPost) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/posts`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        }).then(res => {
            return res.json();
        });
    },

    deletePost: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/posts/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.json();
        });
    },

    EditPost: (id, postEdit) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/posts/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postEdit)
        }).then(res => {
            return res.json();
        });
    },

    detailsPost: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/posts/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.json();
        });
    },

    deleteComment: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/comments/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.json();
        });
    },

    createComment: (newComment) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/comments`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        }).then(res => {
            return res.json();
        });
    },

    myComments: (postId) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.json();
        });
    }
};

export default ReqHandler;