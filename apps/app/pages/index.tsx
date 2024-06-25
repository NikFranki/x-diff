import { useState, useEffect } from 'react'
import Image from 'next/image';
import { Layout, Page, Text, List, Code } from '@vercel/examples-ui'
import { Button } from '@acme/ui'
import { matchingTextColor, randomColor } from '@acme/utils'
import XDiff from '@franki/x-diff';
import { FaGithub } from 'react-icons/fa'

import Snippet from './snippet'
import CodeBlock from './code-block'
import twoBasicObjectDiffResultImg from '../images/twoBasicObjectDiffResult.png'
import twoBasicTypeArrayDiffResultImg from '../images/twoBasicTypeArrayDiffResult.png'
import twoComplexDataDiffResultImg from '../images/twoComplexDataDiffResult.png'
import twoJsonstringObjectDataDiffResultImg from '../images/twoJsonstringObjectDataDiffResult.png'
import twoBasicTwoArrayLooselyDiffResultImg from '../images/twoBasicTwoArrayLooselyDiffResult.png'
import twoObjectArrayByPrimaryKeyDiffResultImg from '../images/twoObjectArrayByPrimaryKeyDiffResult.png'

import styles from '../styles/Home.module.css'

console.log('XDiff: ', XDiff)
const { diff } = new XDiff()
const result = diff({a: 1}, {a: 2})
console.log('result: ', result)

export default function Index() {
  const [bgColor, setBgColor] = useState('')
  const [textColor, setTextColor] = useState('')
  const changeColor = () => {
    const bg = randomColor()
    setBgColor(bg)
    setTextColor(matchingTextColor(bg))
  }

  const handleLinkToGitHub = () => {
    window.open('https://github.com/NikFranki/x-diff', '__blank')
  }

  useEffect(changeColor, [])

  const initialDefaultConfig = `import XDiff from 'x-diff'

const { diff } = new XDiff()`
  const initialCustomConfig = `import XDiff from 'x-diff'

const { diff } = new XDiff({
  basicTypeArrayStrictDiff: false,
  pointedArrayKeyDiffOrder: ['a[{}].id'],
  ignoreKeys: ['name'],
});`

  const diffTwoBasicObjectBlock = `const before = { a: 1 };
const after = { b: 1 };
const result = diff(before, after);`

  const diffTwoBasicTypeArrayBlock = `const before = [1, 2, 3];
const after = [3, 2, 1];
const result = diff(before, after);`

  const diffTwoComplexObjectBlock = `const before = { a: { c: 1 }};
const after = { a: { c: 2 }};
const result = diff(before, after);`

  const diffTwoObjectContainJsonstringBlock = `const before = {
  "name": 'xx',
  "rule_detail": [
    {
      "detail": "[{\"multiplier\":13]",
    }
  ],
};
const after = {
  "name": 'xx1',
  "rule_detail": [
    {
      "detail": "[{\"multiplier\":12]",
    }
  ],
};
const result = diff(before, after);`

  const diffTwoBasicArrayLooselyBlock = `const before = { a: [1, 3] };
const after = { a: [2, 1] };
const result = diff(before, after);`

  const diffTwoObjectArrayByPrimaryKeyBlock = `const before = { a: [{ id: 3, b: 3 }, { id: 1, b: 1 }] };
const after = { a: [{ id: 1, b: 1 }, { id: 4, b: 4 }] };
const result = diff(before, after);`

  return (
    <Page>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <div className={styles.intro}>
            <h1 className={styles.libraryName}>X-DIFF Document</h1>
            <div className={styles.libraryDesc}>A light toolkit to diff Object.</div>
            <div className={styles.link}>
              <button onClick={handleLinkToGitHub} className={styles.githubBtn}>
                <FaGithub className="mr-2" />
                GitHub
              </button>
            </div>
          </div>

          <div className={styles.separate}></div>

          <div className={styles.installaton}>
            <h3>Installation</h3>
            <div className={styles.pnpmInstallation}>
              <Snippet code="pnpm add @franki/x-diff" />
            </div>
            <div className={styles.npmInstallation}>
              <Snippet code="npm install @franki/x-diff" />
            </div>
            <div className={styles.yarnInstallation}>
              <Snippet code="yarn install @franki/x-diff" />
            </div>
          </div>

          <div className={styles.separate}></div>

          <div className={styles.defaultDiffConfig}>
            <h3>Default Diff Config</h3>

            <div>
              <h4>initial xdiff</h4>
              <CodeBlock onlyShowCode code={initialDefaultConfig} />
            </div>

            <div>
              <h4>diff two simple object</h4>
              <Image alt="img" src={twoBasicObjectDiffResultImg} />
              <CodeBlock code={diffTwoBasicObjectBlock} />
            </div>

            <div>
              <h4>diff two basic type array</h4>
              <Image alt="img" src={twoBasicTypeArrayDiffResultImg} />
              <CodeBlock code={diffTwoBasicTypeArrayBlock} />
            </div>

            <div>
              <h4>diff two complex object</h4>
              <Image alt="img" src={twoComplexDataDiffResultImg} />
              <CodeBlock code={diffTwoComplexObjectBlock} />
            </div>

            <div>
              <h4>diff two jsonstring object</h4>
              <Image alt="img" src={twoJsonstringObjectDataDiffResultImg} />
              <CodeBlock code={diffTwoObjectContainJsonstringBlock} />
            </div>
          </div>

          <div className={styles.separate}></div>

          <div className={styles.customDiffConfig}>
            <h3>Custom Diff Config</h3>

            <div>
              <h4>initial custom diff</h4>
              <CodeBlock onlyShowCode code={initialCustomConfig} />
            </div>

            <div>
              <h4>diff two array loosely</h4>
              <Image alt="img" src={twoBasicTwoArrayLooselyDiffResultImg} />
              <CodeBlock code={diffTwoBasicArrayLooselyBlock} />
            </div>

            <div>
              <h4>diff two object array by primary key</h4>
              <Image alt="img" src={twoObjectArrayByPrimaryKeyDiffResultImg} />
              <CodeBlock code={diffTwoObjectArrayByPrimaryKeyBlock} />
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={styles.author}>Made by Franki.</div>
          <div className={styles.authorDesc}>A guy who loves to create something special.</div>
        </div>
      </footer>

      <Text variant="h1" className="mb-6">
        Monorepo
      </Text>
      <Text className="mb-4">
        In this monorepo app we have a single site with two installed
        dependencies that are available in the same repository.
      </Text>
      <List className="mb-4">
        <li>
          <Code>app</Code> is the current Next.js site you&apos;re looking at
        </li>
        <li>
          <Code>packages/ui</Code> is a package that exports the button you see
          below
        </li>
        <li>
          <Code>packages/utils</Code> is a package that exports a function that
          generates random colors. Click the button to see it in action
        </li>
      </List>
      {bgColor && textColor && (
        <>
          <Button
            style={{
              backgroundColor: bgColor,
              color: textColor,
              borderColor: textColor,
            }}
            onClick={changeColor}
          >
            Change Color
          </Button>
        </>
      )}
    </Page>
  )
}

Index.Layout = Layout
