import React from 'react';
import './sort.css';

const Sort = ({ sort }) => {
	const handleSort = (e) => {
		if (e.currentTarget.dataset.most) {
			sort('most');
		} else if (e.currentTarget.dataset.least) {
			sort('least');
		}
	};

	return (
		<div className="sort-wrap">
			<div>Sort by</div>
			<div className="sort-way" onClick={handleSort} data-most>
				most popular
			</div>
			/
			<div className="sort-way" onClick={handleSort} data-least>
				least popular
			</div>
		</div>
	);
};

export default Sort;
