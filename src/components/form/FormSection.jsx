const FormSection = ({ title, children }) => (
  <section className="mb-8">
    {title && <h3 className="mb-4 text-lg font-medium">{title}</h3>}
    {children}
  </section>
);

export default FormSection;
