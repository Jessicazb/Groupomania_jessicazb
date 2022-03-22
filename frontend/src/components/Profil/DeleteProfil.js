import axios from "axios"
import DeleteIcon from '@material-ui/icons/Delete';

function DeleteProfil() {
    const deleteHandle = () => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        const userId = userInfo.id
    
        //axios DELETE
        axios({
            method: "DELETE",
            url: "http://localhost:4200/api/deleteUser",
            headers: {
              "Authorization": localStorage.getItem("Token"),
            },
            params: {userId},
            data: {
              id: userId,
            },
          })
            .then(res => {
              localStorage.clear()
            })
            .catch(err => {
              console.log(err)
            })
    }

    return (
        <div className="supprimer-compte">Supprimer compte<DeleteIcon className="delete-icon" onClick={() => {
            if (window.confirm("Voulez-êtes sûr de vouloir supprimer votre profi?")) {
                deleteHandle()
            }
        }} />
        </div>
    )

}

export default DeleteProfil;