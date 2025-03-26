const ContactMap = () => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg">
      <div className="aspect-video bg-gray-200">
        <iframe
          title="Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2029.2068880282475!2d18.971425880180842!3d50.14915797125516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716c9e6b77e613b%3A0x447ceee85e9f7c9b!2zU8WCb2RrYSBQxJl0ZWxrYQ!5e0!3m2!1spl!2spl!4v1736168284439!5m2!1spl!2spl"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
export default ContactMap
