import {
  FormEvent, useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos, postTodos } from '../../api/todos';
import { Error } from '../../types/error';
import { Todo } from '../../types/Todo';
import { AuthContext } from '../Auth/AuthContext';

type Props = {
  setVisibleLoader: (loader: boolean) => void;
  visibleLoader: boolean;
  setTodos: (todos: Todo[]) => void;
  todos: Todo[];
  setActiveItems: (activeItems: number) => void;
  activeItems: number;
  setErrorType: (error: Error) => void;
};

export const NewTodoField: React.FC<Props> = ({
  setVisibleLoader,
  visibleLoader,
  setTodos,
  todos,
  setActiveItems,
  activeItems,
  setErrorType,
}) => {
  const newTodoField = useRef<HTMLInputElement>(null);
  const user = useContext(AuthContext);

  const [title, setTitle] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);

  const reset = () => {
    setTitle('');
    setCompleted(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (title.trim()) {
      setVisibleLoader(true);
      setActiveItems(activeItems + 1);

      setTodos([...todos, {
        title,
        userId: user?.id || 0,
        completed,
        id: 0,
      }]);

      postTodos({
        userId: user?.id || 0,
        title,
        completed,
      }).then(() => {
        getTodos(user?.id || 0)
          .then(setTodos);

        setVisibleLoader(false);
      })
        .catch(() => setErrorType(Error.Add));
    } else {
      setErrorType(Error.Empty);
    }

    reset();
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={visibleLoader}
      />
    </form>
  );
};
