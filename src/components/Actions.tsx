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
			<button
				className={`${styles.action}`}
				onClick={handleAddNew}
				tabIndex={0}
			>
				New
			</button>
			<div className={`${styles.filter}`}>
				<div>
					<label>
						<input
							checked={filterItems === Filter.All}
							name="filter"
							onChange={handleFilterChange}
							type="radio"
							value={Filter.All}
						/>
						Display All
					</label>
				</div>
				<div>
					<label>
						<input
							checked={filterItems === Filter.Completed}
							onChange={handleFilterChange}
							name="filter"
							type="radio"
							value={Filter.Completed}
						/>
						Completed
					</label>
				</div>
				<div>
					<label>
						<input
							onChange={handleFilterChange}
							checked={filterItems === Filter.Incomplete}
							name="filter"
							type="radio"
							value={Filter.Incomplete}
						/>
						Not Complete
					</label>
				</div>
			</div>
		</div>
	);
};

export default Actions;
