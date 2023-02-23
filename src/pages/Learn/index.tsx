import { CheckIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Tooltip } from '@chakra-ui/react';
import classNames from 'classnames';
import { SyntheticEvent, useRef, useState } from 'react';
import './style.scss';
type Props = {}

type ItemType = {
  id: number;
  position: number;
  name: string
}
type DataType = {
  id: number; name: string; position: number
}
const Learn = (props: Props) => {
  const [activeKey, setActiveKey] = useState<number>(0)
  const popOver = useRef<HTMLDivElement>(null)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, key: number) => {
    console.log(e)
    if (popOver?.current) {
      console.log(popOver.current.style)
      popOver!.current.style.top = `${e?.pageY}px`
      popOver!.current.style.left = `${e?.pageX}px`
    }

    setActiveKey(key)
  }
  const handleMouseUp = (e: SyntheticEvent) => {
    e.stopPropagation()
    setActiveKey(0)
  }
  const Items = (props: ItemType) => {
    const { id, position, name } = props
    return (
      <div className="container-wrap">
        <Tooltip label={name}>
          <div className={classNames("learn-step", activeKey === id && 'click')
          }
            onMouseUp={handleMouseUp}
            onMouseDown={(e) => handleMouseDown(e, id)}
            onMouseLeave={handleMouseUp}

            style={{ left: `${position * 40}px` }}
          >
            <CheckIcon w={6} h={6} color="#f89200" />

          </div >

        </Tooltip>
      </div>

    )
  }
  const fakeData = [{
    id: 'a',
    name: 'Level 1',
    description: 'Gọi đồ uống, chào hỏi',
    data: [
      {
        id: 1,
        name: 'Gọi đồ uống'
      },
      {
        id: 2,
        name: 'Chào hỏi'
      },
      {
        id: 3,
        name: 'Gọi đồ uống 2'
      },
      {
        id: 4,
        name: 'Chào hỏi 2'
      },
      {
        id: 5,
        name: 'Gọi đồ uống 3'
      }
    ]
  },
  {
    id: 'b',
    name: 'Level 2',
    description: 'Gọi đồ uống, chào hỏi',
    data: [
      {
        id: 6,
        name: 'Gọi đồ uống'
      },
      {
        id: 7,
        name: 'Chào hỏi'
      },
      {
        id: 8,
        name: 'Gọi đồ uống 2'
      },
      {
        id: 9,
        name: 'Chào hỏi 2'
      },
      {
        id: 10,
        name: 'Gọi đồ uống 3'
      },
      {
        id: 11,
        name: 'Gọi đồ uống 4'
      },
      {
        id: 12,
        name: 'Chào hỏi 5'
      },
      {
        id: 13,
        name: 'Gọi đồ uống 6'
      },
      {
        id: 14,
        name: 'Chào hỏi 7'
      },
      {
        id: 15,
        name: 'Gọi đồ uống 8'
      }
    ]
  }
  ]

  const revertData = () => {
    let dataRevert = {
      index: 0,
      mode: 'minus'
    }

    return fakeData.map(x => {
      let listArr: DataType[] = []
      x?.data.forEach(item => {
        listArr.push({
          ...item, position: dataRevert.index
        })
        if (dataRevert?.mode === 'minus') {
          if (dataRevert?.index === -1) {
            dataRevert.mode = 'add'
          }
          dataRevert.index = dataRevert.index - 1
        }
        else {
          if (dataRevert?.index === 1) {
            dataRevert.mode = 'minus'
          }
          dataRevert.index = dataRevert.index + 1
        }


      })
      return { ...x, data: listArr }
    })
  }

  return (
    <Flex w='100%' justifyContent='space-between'>
      <Center w='100%' display='flex' flexDirection='column'>
        {revertData().map(x =>
          <div key={x?.id} className="wrapper">
            <Box bg='#ffc800' w='50%' p={6} borderWidth='1px' borderRadius='lg'>
              <div className="title">
                <span className="level">{x?.name}</span>
                <span>{x?.description}</span>
              </div>
            </Box>
            <div className="learn-container">
              {x?.data.map(item =>
                <Items key={item?.id} id={item?.id} position={item?.position} name={item?.name} />
              )}

            </div>
          </div>
        )}
        <div className='popover' ref={popOver}>
          <span>This is text for learning doulingo 2.0</span>
        </div>
      </Center>
      <Center w='50%'>
        <Box position="sticky">
          123123
        </Box>
      </Center>
    </Flex>

  )
}

export default Learn