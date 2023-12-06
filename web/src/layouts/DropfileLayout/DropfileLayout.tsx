type DropfileLayoutProps = {
  children?: React.ReactNode
}

const DropfileLayout = ({ children }: DropfileLayoutProps) => {
  return (
    <>
      <header>
        <h1>DropFile Page</h1>
      </header>
      <main>{children}</main>
    </>
  )
}

export default DropfileLayout
