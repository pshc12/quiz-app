import Main from './components/main'

const Home: React.FC = () => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-between p-5 bg-black text-white">
      <div
        className="fixed inset-0 before:left-0 before:w-full before:h-full before:z-0 bg-gradient-main"
        style={{
          WebkitMask:
            'radial-gradient(circle at 70% 60%, black 0%, transparent 80%)',
        }}
      />
      <div
        className="fixed inset-0 before:left-0 before:w-full before:h-full before:z-0 bg-gradient-main"
        style={{
          WebkitMask:
            'radial-gradient(circle at 0% 20%, black 0%, transparent 60%)',
        }}
      />
      <Main />
    </main>
  )
}

export default Home
