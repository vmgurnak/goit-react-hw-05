// import toast library for notification when the form is empty
import toast from 'react-hot-toast';

// import library Formik
import { Formik, Form, Field } from 'formik';

import css from './SearchForm.module.css';

const SearchForm = ({ onSetSearchParams, searchQuery }) => {
  const initialValues = { query: searchQuery ?? '' };

  const handlerSubmit = (values, actions) => {
    if (!values.query.trim()) {
      toast('Please enter your request.');
      return;
    }
    onSetSearchParams(values.query);
    //  actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handlerSubmit}>
      <Form className={css.MoviesPageForm} autoComplete="off">
        <Field className={css.MoviesPageInput} name="query" type="text" />
        <button className={css.MoviesPageBtn} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default SearchForm;
