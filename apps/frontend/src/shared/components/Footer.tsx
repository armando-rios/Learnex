const Footer = () => {
  return (
    <footer className="bg-theme-bg-primary text-white py-6">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm lg:text-base text-white/80">
          &copy; {new Date().getFullYear()} SkillLink. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
