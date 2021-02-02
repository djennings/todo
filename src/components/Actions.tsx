import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import styles from './Actions.module.css';

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
					<label className={`${styles.label}`}>
						<input
							onChange={handleFilterChange}
							type="radio"
							name="filter"
							value="all"
							checked={filterItems === 'all'}
						/>
						Display All
					</label>
				</div>
				<div>
					<label className={`${styles.label}`}>
						<input
							onChange={handleFilterChange}
							type="radio"
							name="filter"
							value="completed"
							checked={filterItems === 'completed'}
						/>
						Completed
					</label>
				</div>
				<div>
					<label className={`${styles.label}`}>
						<input
							onChange={handleFilterChange}
							type="radio"
							name="filter"
							value="incomplete"
							checked={filterItems === 'incomplete'}
						/>
						Not Complete
					</label>
				</div>
			</div>
		</div>
	);
};

export default Actions;
