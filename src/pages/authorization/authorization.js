import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { Link, Navigate } from 'react-router-dom';
import { H2 } from '../../components/h2/h2';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setUser } from '../../actions';
import { selectUseRole } from '../../selectors';
import { ROLE } from '../../constants/role';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры.')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа.')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов.'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %.',
		)
		.min(6, 'Неверный пароль. Минимум 3 символа.')
		.max(20, 'Неверный пароль. Максимум 20 символов.'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
	font-weight: 500;
	&:hover {
		background-color: #edff;
		border-radius: 5px;
		transition: 1s;
	}
`;

const ErrorMessage = styled.div`
	font-size: 18px;
	margin: 10px 0 0;
	padding: 10px;
	background-color: #fcadad;
`;

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();

	const store = useStore();

	const roleId = useSelector(selectUseRole);

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;
		return store.subscribe(() => {
			let previousWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== previousWasLogout) {
				reset();
			}
		});
	}, [reset, store]);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, resp }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(resp));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
