import axios from "axios"
import DeleteIcon from '@material-ui/icons/Delete';
import { useNavigate } from "react-router-dom";

function DeleteProfil() {

  const navigate = useNavigate()

    const deleteHandle = () => {
        const userInfo = JSON.parse(localStorage.getItem("user"))
        const userId = userInfo.id

        axios({
            method: "DELETE",
            url: `http://localhost:4200/api/auth/deleteUser?user=${userId}`,
            headers: {
              "Authorization": localStorage.getItem("Token"),
            },
            params: {userId},
            data: {
              id: userId,
            },
          })
            .then(res => {
              localStorage.clear();
              (window.confirm("Votre compte a bien été supprimée!"))
              navigate("/signUp")
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