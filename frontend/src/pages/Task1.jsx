import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Task1 = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddText = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setData([...data, { text: inputValue, checked: false, isEdit: false }]);
      Swal.fire("Added!", "Your todo has been added.", "success");
    }
    setInputValue("");
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        if(data.length === 1){
          localStorage.setItem("data", JSON.stringify([]));
        }
        setData(data.filter((item, i) => i !== index));
        Swal.fire("Deleted!", "Your todo has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  const handleEdit = (index) => {
    if (!data[index].checked) {
      setData((prev) =>
        prev.filter((value, itemIndex) => {
          if (itemIndex === index) {
            value.isEdit = true;
          }
          return value;
        })
      );
    }
  };

  const changeEditText = (index, value) => {
    setData((prev) =>
      prev.filter((item, itemIndex) => {
        if (index === itemIndex) {
          item.text = value;
        }
        return item;
      })
    );
  };
  const handleCheck = (index) => {
    const updated = [...data];
    updated[index].checked = !updated[index].checked;
    setData(updated);
  };

  const handleSaveEdit = (index) => {
    setData((prev) =>
      prev.filter((value, itemIndex) => {
        if (itemIndex === index) {
          value.isEdit = false;
          if (value.text.trim() === "") {
            return;
          }
        }
        return value;
      })
    );
    console.log("saved");
  };

  useEffect(() => {
    const tododata = JSON.parse(localStorage.getItem("data"));
    console.log(tododata);
    if (tododata) {
      setData(tododata);
    }
  }, []);

  return (
    <div className="min-h-screen w-full md:p-5 flex justify-center bg-gray-300 items-center">
   
      <form onSubmit={(e) => handleAddText(e)} className="w-full md:w-[50%] bg-white p-4">
           <h1 className="text-center font-bold text-2xl mb-4">Todo List</h1>
        <input
          className="w-[80%] p-2 border rounded-md"
          placeholder="Enter any task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
              
        <button
          type="submit"
          className="ml-3 bg-black text-white px-3 py-2 rounded-md"
        >
          Add
        </button>

        <div className="mt-5 space-y-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-3 rounded-md"
            >
              {item.isEdit ? (
                <input
                  className="p-2 w-[80%]"
                  value={item.text}
                  onChange={(e) => changeEditText(index, e.target.value)}
                />
              ) : (
                <p className={item.checked ? "line-through text-gray-500" : ""}>
                  {item.text}
                </p>
              )}

              <div className="flex gap-2">
                {!item.isEdit && (
                  <button
                    type="button"
                    onClick={() => handleCheck(index)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md"
                  >
                    {item.checked ? "Uncheck" : "Check"}
                  </button>
                )}

                {item.isEdit ? (
                  <button
                    type="button"
                    onClick={() => handleSaveEdit(index)}
                    className="px-2 py-1 bg-black text-white rounded-md"
                  >
                    save
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className="px-2 py-1 bg-black text-white rounded-md"
                  >
                    Edit
                  </button>
                )}

                {!item.isEdit && (
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Task1;
