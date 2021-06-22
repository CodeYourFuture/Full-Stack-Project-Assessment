import React from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

const SortComponent = ({ setOrderBy, orderBy }) => {
	return (
		<RadioGroup onChange={setOrderBy} value={orderBy}>
			<Stack direction="row">
				<Radio value="asc">Ascending by rating</Radio>
				<Radio value="desc">Descending by rating</Radio>
			</Stack>
		</RadioGroup>
	)
};

export default SortComponent;