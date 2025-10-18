import { Text, Container, ActionIcon, Group } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './Footer.module.css';

// Εδώ μπορείτε να βάλετε τα πραγματικά σας links
const data = [
  {
    title: 'About',
    links: [
      { label: 'Features', link: '#' },
      { label: 'Pricing', link: '#' },
      { label: 'Support', link: '#' },
      { label: 'Forums', link: '#' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Contribute', link: '#' },
      { label: 'Media assets', link: '#' },
      { label: 'Changelog', link: '#' },
      { label: 'Releases', link: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Join Discord', link: '#' },
      { label: 'Follow on Twitter', link: '#' },
      { label: 'Email newsletter', link: '#' },
      { label: 'GitHub discussions', link: '#' },
    ],
  },
];

export function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Text size="xl" fw={700}>Block MBT</Text>
          {/* ΑΛΛΑΓΗ ΕΔΩ: από size="xs" σε size="sm" */}
          <Text size="sm" c="dimmed">
            Build your business plan, step by step.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        {/* ΑΛΛΑΓΗ ΕΔΩ: από size="sm" σε size="md" */}
        <Text c="dimmed" size="md">
          © {new Date().getFullYear()} Block MBT. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}