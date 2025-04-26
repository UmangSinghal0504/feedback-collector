const Footer = () => {
    return (
      <footer className="mt-12">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-gray-200 dark:border-gray-700 transform transition-all hover:scale-[1.01] hover:shadow-xl">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                Feedback Collector
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Your opinions shape our improvements
              </p>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600 my-3"></div>
              <div className="flex flex-col items-center">
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Developed by <span className="font-semibold text-indigo-600 dark:text-indigo-400">Umang Singhal</span>
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                  © {new Date().getFullYear()} - Candidate Submission
                </p>
                <div className="mt-3 flex space-x-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-indigo-400"></span>
                  <span className="inline-block h-2 w-2 rounded-full bg-pink-400"></span>
                  <span className="inline-block h-2 w-2 rounded-full bg-purple-400"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer