import { Component, ErrorInfo, ReactNode } from 'react'
import Lottie from 'react-lottie'

import PageNotFound from 'src/assets/images/404-error-page.json'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error: ', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className='container'>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: PageNotFound,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            speed={0.5}
          />
          <div className='text-center'>
            <a href='/' className='fs-20 font-semibold hover:text-primary-377DFF' title='Home'>
              Go Home
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
