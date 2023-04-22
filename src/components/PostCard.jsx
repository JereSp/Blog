import React from 'react'
import styles from '../styles/PostCard.module.css'
import Link from 'next/link'

function PostCard({title, image, date, slug}) {
  return (
    <div className={styles.container}>
        <Link href={`post/${slug}`}>
        <img className={styles.image} src={image} alt="post image" />
        <h1>{title}</h1>
        <p>{date}</p>
        </Link>
    </div>
  )
}

export default PostCard