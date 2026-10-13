import { useAssociates } from "../AssociatesContext/AssociatesContext";
import Modal from "../Modal/Modal";
import CloseWindowX from "../CloseWindowX/CloseWindow";
import SearchUsers from "../SearchUsers/SearchUsers";
import "./SearchUsersModalButton.css"
function SearchUsersModalButton() {
    const context=useAssociates();
    const handleButtonClick = () => {
        context.handleModalOpen();
    };
    
  return (
    <div className="search-button-wrapper">
        <button className="search-button" onClick={handleButtonClick}> Find New Associates &nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg></button>
        <Modal isOpen={context.modalOpen} modalStyle={'search-users-modal'}>
            <CloseWindowX onClose={()=>{context.handleModalClose();}}/>
            <SearchUsers/>
            
        </Modal>
    </div>
  )
}

export default SearchUsersModalButton