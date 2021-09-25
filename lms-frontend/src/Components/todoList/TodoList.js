import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";

import { getTasks, createTask, updateTodo } from "../../actions/todo";

import "./todoList.css";

let option_filter = [];

const TodoList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    setLoading(true);
    dispatch(getTasks());
  }, [dispatch]);

  const todoData = useSelector((state) => state.TaskReducer.task);
  // console.log(todoData);

  //getting the current user of the application from the local storage
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile"))?.payload.user);
    option_filter = todoData?.filter((todo) => {
      return (
        todo.CreatedBy?._id ===
        JSON.parse(localStorage.getItem("profile"))?.payload.user?._id
      );
    });

    console.log("before filter", option_filter);
    if (option_filter?.length > 0) {
      const todoFilter = {
        todo: {
          items: option_filter[0]?.todo?.items,
        },
        in_progress: {
          items: option_filter[0]?.in_progress?.items,
        },
        done: {
          items: option_filter[0]?.done?.items,
        },
      };
      console.log(todoFilter);
      setTodoId(option_filter[0]?._id);
      setState(todoFilter);
    }
  }, [todoData]);

  const [text, setText] = useState("");
  const [state, setState] = useState({
    todo: {
      items: [],
    },
    in_progress: {
      items: [],
    },
    done: {
      items: [],
    },
  });

  // useEffect(() => {
  //   if (option_filter) {
  //     setState(option_filter);
  //   }
  //console.log("useEffect", option_filter);
  //   //setState(option_filter);
  // }, [option_filter]);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };

      // Remove from previous items array

      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  const addItem = () => {
    setState((prev) => {
      return {
        ...prev,
        todo: {
          items: [
            {
              id: v4(),
              name: text,
            },
            ...prev.todo.items,
          ],
        },
      };
    });

    setText("");
  };

  const save = async () => {
    let todo = {
      ...state,
      CreatedBy: user._id,
    };
    if (todoId) {
      todo = {
        ...todo,
        _id: todoId,
      };
      console.log(todo);
      // Patch
      const res = await dispatch(updateTodo(todo));
      if (res.status === 200) {
        console.log("OK");
      }
    } else {
      // create
      const res = await dispatch(createTask(todo));
      if (res.state === 200) {
        console.log("Crete");
      }
    }
  };

  return (
    <div className={"todo"}>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items?.map((el, index) => {
                        return (
                          <Draggable
                            key={el.id}
                            index={index}
                            draggableId={el.id}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  className={`item ${
                                    snapshot.isDragging && "dragging"
                                  }`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
      <div>
        <button onClick={save}>Save</button>
      </div>
    </div>
  );
};

export default TodoList;
