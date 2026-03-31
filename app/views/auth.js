export function loginFormView({errors}){
    console.log(errors);
    return `
    <section aria-labelledby="login-heading" class="center"> 
       <h2 id="login-heading">sign in to your account </h2>
       <p>Don't "have an account ?" <a href="/register">Sign up here </a> </p>
       <form method="POST" class="auth">
            <label for="username">username: </label>
            <input id="username" name="username">
            <label for="password">Password: </label>
            <input id="password" name="password" type"password">
            <button> Sign In </button>
       </form>
    </section>
    `
}

export function registrationFormView({errors}){
    console.log(errors);
    return `
    <section aria-labelledby="register-heading" class="center"> 
       <h2 id="register-heading">create an account</h2>
       <p> Already an account ?" <a href="/login"> Sign in here </a> </p>
       <form method="POST" class="auth">
       <label for="username">Username: </label>
       <input id="username" name="username">
       <label for="password">Password: </label>
       <input id="password" name="password" type="password">
       <label for="confirm"> Confirm Password: </label>
       <input id="password" type="password">
       
       <button> Sign Up </button>
       </form>
    </section>
    `
}

