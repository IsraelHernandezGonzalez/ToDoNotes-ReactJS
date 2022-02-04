import './styles/BaseDialog.css';

function BaseDialog(props) {
    return (
        <div className="basedialog-container">
            <div>
                <h2>{props.title}</h2>
            </div>
            <div>
                {props.body}
            </div>
        </div>        
    );
}

export default BaseDialog;