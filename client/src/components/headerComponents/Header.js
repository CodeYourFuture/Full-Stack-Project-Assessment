import './Header.css';
import React from "react";
import SortComponent from './SortComponent';
import {
	IconButton,
	HStack,
	useColorMode,
	InputGroup,
	Input,
	InputLeftElement,
	VStack,
	Button
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaSearch } from "react-icons/fa";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

const videObjSchema = Yup.object().shape({
	id: Yup.number().required('Required'),
	time: Yup.date(),
	title: Yup.string().min(3, 'Too short!').max(100, 'Too long!').required('Required'),
	url: Yup.string().max(100).url().required('Please enter valid URL'),
	rating: Yup.number().required('Required')
})

const Header = ({ setVideosArrUpdated, videosArrUpdated, setOrderBy, orderBy }) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const postVideo = (values) => {
		fetch('http://localhost:5000/', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		}).then(res => res.json()).then(() => setVideosArrUpdated(videosArrUpdated + 1)).catch(err => console.error(err))
	}

	const ratingNumber = () => Number(Math.floor(Math.random() * 10000));

	return (
		<VStack>
			<HStack p='1rem' w='100%' display='flex' justifyContent='space-between'>
				<InputGroup w='60vw'>
					<InputLeftElement pointerEvents='none' children={<FaSearch />} />
					<Input />
				</InputGroup>
				<IconButton icon={colorMode === 'light' ? <FaSun /> : <FaMoon />} alignSelf='flex-end' onClick={toggleColorMode} isRound='true' />
			</HStack>
			<Formik initialValues={{
				id: 0,
				title: '',
				url: '',
				rating: 0
			}} validationSchema={videObjSchema} onSubmit={values => {
				values.id = uuidv4();
				values.rating = ratingNumber();
				values.uploadDate = Date();
				postVideo(values);
				// setVideosArr([...videosArr, values])
			}}>
				{({ errors, touched }) => (
					<Form className='form-validation' w={{ lg: '50vw', md: '60vw', sm: '70vw' }}>
						<Field name="title" className='form-field' placeholder='Please enter video title' />
						{errors.title && touched.title ? (
							<div>{errors.title}</div>
						) : null}
						<Field name="url" className='form-field' placeholder='Please enter YouTube video URL' />
						{errors.url && touched.url ? <div>{errors.url}</div> : null}
						<Button type="submit">Submit</Button>
					</Form>
				)}
			</Formik>
			<SortComponent setOrderBy={setOrderBy} orderBy={orderBy} />
		</VStack>
	)
}

export default Header;