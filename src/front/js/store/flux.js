const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            message: null,
            demo: [{
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            auth: false,
            // register: true

        },
        actions: {
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            // LOGIN 
            login: (email, password) => {
                // console.log(email, password);
                fetch(process.env.BACKEND_URL + '/api/login', {
                        method: "POST",
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            setStore({
                                auth: true
                            })
                        } else if (response.status === 404) {
                            alert("usuario no existe")
                            // console.log(response.text());
                        } else {
                            alert("email o contraseña incorrecta")
                        }

                        return response.json()

                    })
                    .then((data) => {
                        console.log(data);
                        localStorage.setItem("token", data.access_token)
                    })
            },

            // REGISTRO
            registration(email, password) {
                fetch(process.env.BACKEND_URL + '/api/user', {
                        method: "POST",
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((response) => {
                        return response.json()

                    })
                    .then((data) => {
                        console.log(data)


                    })
            },



            // LOGOUT
            logout: () => {

                localStorage.removeItem("token")
                setStore({
                    auth: false
                })


            },


            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
                    const data = await resp.json()
                    setStore({
                        message: data.message
                    })
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
            changeColor: (index, color) => {
                //get the store
                const store = getStore();

                //we have to loop the entire demo array to look for the respective index
                //and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({
                    demo: demo
                });
            }
        }
    };
};

export default getState;