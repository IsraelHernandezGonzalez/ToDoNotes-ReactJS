import './DialogLogin.css';

function login() {
    alert("login!!!");
}

function cancelar() {
    alert("Cancelar...");
}

function DialogLogin() {
  return (
    <div className="center fill-blue">
        <div>
            <div>
                <h1>LOGIN</h1><hr />
            </div>
            <div className="fill-blue">
                <div className="flex-container-row fill-green">
                    <div>User:</div>
                    <div><input type="text" id="user" name="userName" /></div>
                </div>
                <div className="flex-container-row fill-green">
                    <div>Password:</div>
                    <div><input type="text" id="password" name="passWord" /></div>
                </div>
            </div>
            <div className="flex-container-button-slot margin-top-10 fill-red">
                <button id="idBtnLogin" value="Login" type="button" className="DialogLogin-btn" onClick={login}>Login</button> 
                <button id="idBtnCancelar" value="Cancelar" type="button" className="DialogLogin-btn" onClick={cancelar}>Cancelar</button>
            </div>
        </div>
    </div>
  );
}

export default DialogLogin;