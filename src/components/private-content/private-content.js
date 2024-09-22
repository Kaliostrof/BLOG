import { useSelector } from 'react-redux';
import { Error } from '../error/error';
import { selectUserRole } from '../../selectors';
import { TEXT_ERROR } from '../../constants';
import { checkAccess } from '../../utils';

export const PrivateContent = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectUserRole);

	const accessError = checkAccess(access, userRole) ? null : TEXT_ERROR.ACCESS_DENIED;
	console.log('Private ', accessError);

	const error = serverError || accessError;
	console.log('Private error', error);

	return error ? <Error error={error} /> : children;
};
