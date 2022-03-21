import axios from "axios"
import DeleteIcon from '@material-ui/icons/Delete';

function DeleteProfil() {
    const deleteHandle = () => {
        const user = JSON.parse(localStorage.getItem("user"))
        const userId = user.id

        //axios DELETE
    }

    return (
        <DeleteIcon className="delete-icon" onClick={() => {
            if (window.confirm("Voulez-êtes sûr de vouloir supprimer votre profi?")) {
                deleteHandle()
            }
        }} />
    )

}

export default DeleteProfil;