import Modal from "@/components/Modal";

function AddMovie() {
  return (
    <Modal isOpen={true} title="Add Movie">
      <form className="dark:bg-slate-900 p-4">
        <input type="file" name="movie" />
        <button>Submit</button>
      </form>
    </Modal>
  );
}

export default AddMovie;
