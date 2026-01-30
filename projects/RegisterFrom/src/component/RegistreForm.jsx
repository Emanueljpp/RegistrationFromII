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
        const newForm = {
            ...form,
            [name]: value
        }

        setForm(newForm)

        // validamos que el usuario haya echo touched y que no haya escrito nada para mostrar errores antes del submit
        if (touched[name]) {
            const validationErrors = validateForm(newForm)
            setErrors({
                ...errors,
                [name]: validationErrors[name] || ""
            })
        }
    }

    // onSubmit para evitar el envio del formulario y agrego de validaciones al hacer submit (no pueden intentar enviarse un formulario vacio)
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

    //descomponentemos el form para indicarle al input que su valor viene del estado padre
    const { username, email, password } = form

    // onBlur para indica que el usuario interactuo con el componente y luego salio de este
    const handlerOnBlur = ({ target }) => {
        const { name } = target
        setTouched({
            ...touched,
            [name]: true
        })
    }

    // Funcion de validacion para errores en los inputs
    function validateForm(form) {
        const validationError = {}
        if (form.username.trim() === "") {
            validationError.username = "campo Obligatorio"
        } else if (form.username.length < 8) {
            validationError.username = "El usuario debe contener al menos 8 cracteres"
        }
        if (form.email.trim() === "") {
            validationError.email = "debe introducir un correo electronico completo"
        }
        if (form.password.trim() === "") {
            validationError.password = "necesita una contraseña para proteger "
        } else if (form.password.length < 8) {
            validationError.password = "la contraseña debe tener al menos 8 cracteres"
        }
        return validationError
    }

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
                    value={email}
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
                    value={password}
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


// const handlerOnBlur = ({ target }) => {
//         const { name } = target
//         setTouched({
//             [name]: true
//         })

//         setTouched(false)

//     }
