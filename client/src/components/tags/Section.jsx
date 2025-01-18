

const Section = ({id = "section-id", title = "Section title", children}) => {
  return (
    <section className="w-full h-auto py-16" id={id}>
        <div className="container">
            <h2 className="text-4xl font-bold mb-10">{title}</h2>
            {children}
        </div>
    </section>
  )
}

export default Section