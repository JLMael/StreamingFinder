const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>
        &copy; {new Date().getFullYear()} StreamingList. Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;
