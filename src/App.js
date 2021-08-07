import "./assets/scss/index.scss"
import Header from "./components/Header/Header"

function App() {
	return (
		<div className="App container">
			<header className="App-header">
				<a
					className="text-danger"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer">
					Learn React
				</a>
				<Header src="https://b2b.talkspace.com/hs-fs/hubfs/TS_nav_logo-1.png?width=2540&name=TS_nav_logo-1.png" />
			</header>
		</div>
	)
}

export default App
