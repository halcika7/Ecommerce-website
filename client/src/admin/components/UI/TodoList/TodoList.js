import React from 'react';
import classes from './TodoList.module.css';

const TodoList = props => {
    return (
        <div className="col-xl-4 mb-30">
            <div className="card card-statistics">
                <div className="card-body">
                    <h5 className={classes.heading + " card-title"}>To Do List </h5>
                    <div className={"btn-group " + classes.infoDrop}>
                        <button type="button" className="dropdown-toggle-split text-muted" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-ellipsis-h"></i></button>
                        <div className="dropdown-menu menu">
                            <a className="dropdown-item" href="/">
                            <i className="far fa-file"></i> Add new</a>
                            <a className="dropdown-item" href="/"><i className="far fa-edit"></i> Edit task</a>
                            <a className="dropdown-item" href="/"><i className="far fa-user"></i> Assign to other</a>
                            <a className="dropdown-item" href="/"><i className="far fa-thumbs-up"></i> All Done</a>
                        </div>
                    </div>
                    <div className="scrollbar max-h-350" tabIndex="2" style={{overflowY: 'hidden', outline: 'none'}}>
                        <ul className={"list-unstyled " + classes.toDo}>
                            <li>
                                <div className={classes.rememeberCheckbox}>
                                    <input type="checkbox" className={classes.formControl + ' form-control'} name="one" id="one" />
                                    <label>Prepare Docs For today's Presentation</label>
                                </div>
                            </li>
                        </ul>
                    </div>        
                </div>
            </div>
        </div>
    );
}

export default TodoList;