import './styles/BaseDialog.css';

function BaseDialog(props) {
    return (
        <div className="base-dialog-container">
            <div>
                <p className='base-dialog-title'>{props.title}</p>
            </div>
            <div>
                {props.body}
            </div>
        </div>        
    );
}

export default BaseDialog;