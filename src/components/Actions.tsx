import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import styles from './Actions.module.css';
import { Filter } from '../todo.d';

const Actions: React.FC = () => {
	const { filterItems, setFilter, toggleAddingNew } = useContext(TodoContext);
	const handleAddNew = () => {
		toggleAddingNew();
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<div className={`${styles.actions}`}>
			<button onClick={handleAddNew} className={`${styles.action}`}>
				New
			</button>
			<div className={`${styles.filter}`}>
				<div>
					<label>
						<input
							onChange={handleFilterChange}
							type="radio"
							name="filter"
							value={Filter.All}
							checked={filterItems === Filter.All}
						/>
						Display All
					</label>
				</div>
				<div>
					<label>
						<input
							onChange={handleFilterChange}
							type="radio"
							name="filter"
							value={Filter.Completed}
							checked={filterItems === Filter.Completed}
						/>
						Completed
					</label>
				</div>
				<div>
					<label>
						<input
							onChange={handleFilterChange}
							type="radio"
							name="filter"
							value={Filter.Incomplete}
							checked={filterItems === Filter.Incomplete}
						/>
						Not Complete
					</label>
				</div>
			</div>
		</div>
	);
};

export default Actions;
