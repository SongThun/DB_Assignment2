import React,{useState} from "react";
//import "./Modal.css"

const Guide = () =>  {
  const [Modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!Modal);
  };

  if(Modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  return(
    <>
    <button className="btn btn-dark col-2 mb-4 p-2 d-flex justify-content-center" onClick={toggleModal}>
      <div className="fw-semibold align-self-center">User Manual</div>
    </button>

    {Modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
              Sapiente dolorum id maiores dolores? Illum pariatur possimus
              quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
              placeat tempora vitae enim incidunt porro fuga ea.
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Guide