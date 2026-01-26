import { useState } from "react"

export const RegistreForm = () => {

    // estado principal, manejo de inputs
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    })

    // Estado de errores
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: ""
    })

    // Estado de interaccion real con los inputs
    const [touched, setTouched] = useState({
        username: false,
        email: false,
        password: false
    })

    //metodo que atrapa lo que el usuari escribe en el input, detecta lo cambios (input controlado)
    const onInputChange = ({ target }) => {
        const { name, value } = target
        setForm({
            ...form,
            [name]: value
        })
    }

    // onSubmit para evitar el envio del formulario y agrego de validaciones al hacer submit
    const onSubmit = (event) => {
        event.preventDefault()

        const newErrors = {
            username: form.username.trim() === "" ? "Campo de usuario obligatorio" : "",
            email: form.email.trim() === "" ? "Campo de email address obligatorio" : "",
            password: form.password.trim() === "" ? "Campo de password obligatorio" : ""
        }

        setErrors(newErrors)

        const hasErrors = Object.values(newErrors).some(errors => errors !== "")
        if (hasErrors) return

        // limpiamos el input para su proximo uso
        setForm({
            username: "",
            email: "",
            password: ""
        })
    }

    // onBlur para indica que el usuario interactuo con el componente y luego salio de este
    const handlerOnBlur = ({ target }) => {
        const { name } = target
        setTouched({
            [name]: true
        })

        setTouched(false)

    }
    //descomponentemos el form para indicarle al input que su valor viene del estado padre
    const { username, email, password } = form

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Email address</label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    placeholder="Write your username"
                    value={username}
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
                    value={email}
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
                    value={password}
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


// const handlerOnBlur = ({ target }) => {
//         const { name } = target
//         setTouched({
//             [name]: true
//         })

//         setTouched(false)

//     }
