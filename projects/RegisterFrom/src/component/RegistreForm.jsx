import { useFrom } from "../hooks/useFrom"

export const RegistreForm = () => {

    const initialValue = {
        username: "",
        email: "",
        password: ""
    }

    const callback = (form) => {
        console.log("Validacion exitosa:", form)

        // aqui normalmnete iria:
        // fetch, axios, API, etc...
    }

    // Funcion de validacion para errores en los inputs
    function validateForm(nameOfForm, value) {

        if (typeof nameOfForm === "string") {

            const name = nameOfForm

            switch (name) {
                case "username":
                    if (value === "" || value.length < 8) {
                        return "debe escribir un nombre de usuario y este debe tener al menos 8 caracteres"
                    }
                    return ""

                case "email":
                    if (value === "") {
                        return "debe escribir un Email para registrarse"
                    }
                    return ""

                case "password":
                    if (value === "" || value.length < 8) {
                        return "debe tener una clave para proteguer su cuenta y esta debe tener al menos 8 caracteres"
                    }
                    return ""

                default:
                    console.log("campo no coincide")
                    return ""
            }
        }
        const form = nameOfForm

        return {
            username: validateForm("username", form.username),
            email: validateForm("email", form.email),
            password: validateForm("password", form.password)
        }
    }

    // conexcion con el Hooks
    const {
        form,
        errors,
        touched,
        onInputChange,
        onSubmit,
        handlerOnBlur } = useFrom(initialValue, validateForm, callback)


    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">User name</label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    placeholder="Write your username"
                    value={form.username}
                    onBlur={handlerOnBlur}
                    onChange={onInputChange}
                />
                <div id="usernameHelp" className="form-text">We'll never share your username with anyone else.</div>

                {errors.username && <p className="errors" style={{ color: "red" }}>{errors.username}</p>}

            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Write your email address"
                    value={form.email}
                    onBlur={handlerOnBlur}
                    onChange={onInputChange}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            {errors.email && <p className="errors" style={{ color: "red" }}>{errors.email}</p>}

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Write your password"
                    value={form.password}
                    onBlur={handlerOnBlur}
                    onChange={onInputChange}
                />
                <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
            </div>

            {errors.password && <p className="errors" style={{ color: "red" }}>{errors.password}</p>}

            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" name="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

