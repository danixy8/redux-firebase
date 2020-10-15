import {auth, firebase, db} from '../Firebase'

// data inicial
const dataInicial = {
    loading: false,
    activo: false
}

//types
    const LOADING = 'LOADING'
    const USUARIO_ERROR = 'USUARIO_ERROR'
    const USUARIO_EXITO = 'USUARIO_EXITO'
    const CERRAR_SESION = 'CERRAR_SESION'

//reducer
export default function usuarioReducer(state = dataInicial, action){
    switch(action.type){
        case LOADING:
           return {...state, loading: true}
        case USUARIO_ERROR:
           return {...dataInicial}
        case USUARIO_EXITO:
           return {...state, loading: false, user: action.payload, activo: true}
        case CERRAR_SESION:
            return {...dataInicial}
        default:
            return {...state}
    }
}

//action
export const ingresoUsuarioAccion = () => async(dispatch) => {
    dispatch({
        type: LOADING
    })
    try {
        
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)

        const objetoUsuario = {
            uid: res.user.uid,
            email: res.user.email,
            photoURL: res.user.photoURL,
            displayName: res.user.displayName
        }
        
        const usuarioDB = await db.collection('usuarios').doc(res.user.email).get()
        if(usuarioDB.exists){
            console.log(usuarioDB.data())
            dispatch({
                type: USUARIO_EXITO,
                payload: usuarioDB.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))
        }else{
            console.log('no existe')
            await db.collection('usuarios').doc(res.user.email).set(objetoUsuario)
            dispatch({
                type: USUARIO_EXITO,
                payload: objetoUsuario
            })
            localStorage.setItem('usuario', JSON.stringify(objetoUsuario))
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const leerUsuarioActivoAccion = () => (dispatch) => {
    if (localStorage.getItem('usuario')){
        dispatch({
            type: USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }
}

export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut()
    localStorage.removeItem('usuario')
    dispatch ({
        type: CERRAR_SESION
    })
}