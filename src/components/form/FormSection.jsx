import PropTypes from 'prop-types';

const FormSection = ({ title, children }) => (
  <section className="mb-8">
    {title && <h3 className="mb-4 text-lg font-medium">{title}</h3>}
    {children}
  </section>
);

FormSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FormSection;
