import React from 'react';
import './sort.css';

const Sort = ({ sort }) => {
	const handlePopluar = () => {
		sort('popular');
	};
	const handleAsc = () => {
		sort('asc');
	};

	return (
		<div className="sort-wrap">
			<div>Sort by</div>
			<div className="sort-way" onClick={handlePopluar}>
				most popular
			</div>
			/
			<div className="sort-way" onClick={handleAsc}>
				name
			</div>
		</div>
	);
};

export default Sort;
