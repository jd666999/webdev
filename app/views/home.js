export function homeView({session}){
    const  message = session 
       ? `Welcome ${session.username}, this is your home page.`
       : "welcome to  the home page, sign in to get persionalised content."
    return`

        <section aria-labelledby="home-heading">
            <h2 id="home-heading">Home Page</h2>
            <p>${message}</p>
        </section>
        `
}